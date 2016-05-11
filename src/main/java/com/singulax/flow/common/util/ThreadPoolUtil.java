package com.singulax.flow.common.util;

import java.util.concurrent.*;

/**
 * @author tonnyyi
 * @since 15/5/11 10:26
 */
public class ThreadPoolUtil {

    public static ExecutorService chargeBatchPool;

    static {
        initChargeBatchPool();
    }

    private static void initChargeBatchPool() {
        if (chargeBatchPool == null || chargeBatchPool.isTerminated() || chargeBatchPool.isShutdown()) {
            synchronized (ThreadPoolUtil.class) {
                // double check
                if (chargeBatchPool == null || chargeBatchPool.isTerminated() || chargeBatchPool.isShutdown()) {
                    chargeBatchPool = Executors.newFixedThreadPool(100);
                }
            }
        }

    }
}
